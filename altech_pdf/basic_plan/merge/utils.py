import os
import uuid
from PyPDF2 import PdfReader, PdfWriter

def merge_pdfs(files, output_path):
    writer = PdfWriter()

    for file in files:
        reader = PdfReader(file)
        for page in reader.pages:
            writer.add_page(page)

    # Asigură-te că directorul pentru output există
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, 'wb') as out:
        writer.write(out)

    return output_path
