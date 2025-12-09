#!/usr/bin/env python3
"""
PDF to DOCX converter using pdf2docx library
Usage: python3 convert_pdf.py <input.pdf> <output.docx>
"""

import sys
from pdf2docx import Converter

def convert_pdf_to_docx(pdf_file, docx_file):
    """Convert PDF to DOCX format"""
    try:
        cv = Converter(pdf_file)
        cv.convert(docx_file, start=0, end=None)
        cv.close()
        print(f"✓ Successfully converted {pdf_file} to {docx_file}")
        return True
    except Exception as e:
        print(f"✗ Conversion failed: {str(e)}", file=sys.stderr)
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 convert_pdf.py <input.pdf> <output.docx>")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]

    success = convert_pdf_to_docx(input_path, output_path)
    sys.exit(0 if success else 1)
