#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

// Define structure for the opcode table
typedef struct {
    char mnemonic[6];
    char opcode[3];
    int format;  // Instruction format: 3 or 4 bytes
} Opcode;

// Opcode table with a few SIC/XE instructions
Opcode opTable[] = {
    {"LDA", "00", 3},
    {"STA", "0C", 3},
    {"ADD", "18", 3},
    {"SUB", "1C", 3},
    {"MUL", "20", 3},
    {"COMP", "28", 3},
    {"J", "3C", 3},
    {"JEQ", "30", 3},
    {"JSUB", "48", 3},
    {"LDB", "68", 3}
};

#define OPCODE_TABLE_SIZE (sizeof(opTable) / sizeof(Opcode))

// Function to find the opcode and format for a given mnemonic
Opcode* getOpcode(char* mnemonic) {
    for (int i = 0; i < OPCODE_TABLE_SIZE; i++) {
        if (strcmp(opTable[i].mnemonic, mnemonic) == 0) {
            return &opTable[i];
        }
    }
    return NULL;  // Return NULL if not found
}

// Helper function to convert hexadecimal string to integer
int hexToInt(char *hex) {
    return (int)strtol(hex, NULL, 16);
}

// Main function to read file and generate object program
int main() {
    FILE *inputFile, *outputFile;
    char line[100], label[10], mnemonic[10], operand[10];
    int startAddress = 0x1000;  // Example starting address
    int locationCounter = startAddress;

    // Open input and output files
    inputFile = fopen("input.asm", "r");
    outputFile = fopen("output.obj", "w");

    if (inputFile == NULL || outputFile == NULL) {
        printf("Error opening file.\n");
        return 1;
    }

    fprintf(outputFile, "H^%06X\n", startAddress);  // Header record

    // Read each line from the input file
    while (fgets(line, sizeof(line), inputFile)) {
        // Parse the line (assuming format: LABEL MNEMONIC OPERAND)
        sscanf(line, "%s %s %s", label, mnemonic, operand);

        // Get the opcode structure for the mnemonic
        Opcode *op = getOpcode(mnemonic);
        if (op != NULL) {
            // Determine addressing mode based on operand prefix
            int ni = 0x3;  // Default to simple addressing (n=1, i=1)
            if (operand[0] == '#') {
                ni = 0x1;  // Immediate addressing (n=0, i=1)
                memmove(operand, operand + 1, strlen(operand));  // Remove '#'
            } else if (operand[0] == '@') {
                ni = 0x2;  // Indirect addressing (n=1, i=0)
                memmove(operand, operand + 1, strlen(operand));  // Remove '@'
            }

            // Calculate the instruction length and handle extended format
            int instructionLength = op->format;
            if (instructionLength == 4) {
                ni |= 0x01;  // Set e=1 for extended format
            }

            // Generate object code
            int operandAddress = hexToInt(operand);  // Assuming operand is an address in hex
            fprintf(outputFile, "T^%06X^%X%s%04X\n", locationCounter, ni, op->opcode, operandAddress);

            locationCounter += instructionLength;  // Update location counter by instruction length
        } else {
            printf("Error: Unknown mnemonic %s\n", mnemonic);
        }
    }

    fprintf(outputFile, "E^%06X\n", startAddress);  // End record

    // Close files
    fclose(inputFile);
    fclose(outputFile);

    printf("Object program generated in output.obj\n");
    return 0;
}
