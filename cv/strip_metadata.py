"""
Run from the cv/ folder:
    python strip_metadata.py <file.pdf>

Strips all document metadata from the PDF in-place.
Requires: pip install pypdf
"""
import sys
import os
import pypdf


def strip(path: str) -> None:
    tmp = path + ".tmp"
    reader = pypdf.PdfReader(path)
    writer = pypdf.PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    writer.add_metadata({"/Title": "", "/Author": "", "/Subject": "",
                         "/Keywords": "", "/Creator": "", "/Producer": ""})
    with open(tmp, "wb") as f:
        writer.write(f)
    os.replace(tmp, path)
    print(f"Stripped: {path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python strip_metadata.py <file.pdf>")
        sys.exit(1)
    strip(sys.argv[1])
