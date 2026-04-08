import os
from pathlib import Path
from dotenv import load_dotenv
from sqlmodel import create_engine, SQLModel, Session

# Explicitly load .env from the same directory as this file,
# regardless of where the process is launched from.
load_dotenv(dotenv_path=Path(__file__).parent / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set. Check your .env file.")

# Print masked URL for startup diagnostics (password hidden).
_masked = DATABASE_URL.replace(
    DATABASE_URL.split(":")[2].split("@")[0], "****"
)
print(f"[database] Connecting with: {_masked}")

engine = create_engine(DATABASE_URL, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def drop_contact_table():
    """Drop the contactinquiry table so it can be recreated with the current schema.
    The product table is left untouched.
    """
    from sqlalchemy import text
    with engine.connect() as conn:
        conn.execute(text("DROP TABLE IF EXISTS contactinquiry"))
        conn.commit()


def get_session():
    with Session(engine) as session:
        yield session
