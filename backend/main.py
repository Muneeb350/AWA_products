from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from database import engine, create_db_and_tables, drop_contact_table, get_session
from models import Product, ContactInquiry

app = FastAPI(title="Awaproducts API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SEED_PRODUCTS = [
    Product(
        name="Glass Cleaner Pro",
        description="High-performance streak-free glass and window cleaner for commercial use.",
        price=5500.00,
        category="Glass Care",
        image_url="https://via.placeholder.com/400x300?text=Glass+Cleaner+Pro",
    ),
    Product(
        name="Heavy Duty Floor Cleaner",
        description="Industrial-strength floor cleaner suitable for tiles, marble, and hardwood.",
        price=7200.00,
        category="Floor Care",
        image_url="https://via.placeholder.com/400x300?text=Floor+Cleaner",
    ),
    Product(
        name="Multi-Surface Disinfectant",
        description="Broad-spectrum disinfectant that eliminates 99.9% of bacteria and viruses.",
        price=9800.00,
        category="Disinfectants",
        image_url="https://via.placeholder.com/400x300?text=Disinfectant",
    ),
    Product(
        name="Bathroom Descaler",
        description="Powerful descaling agent for removing limescale and mineral deposits.",
        price=6400.00,
        category="Bathroom Care",
        image_url="https://via.placeholder.com/400x300?text=Bathroom+Descaler",
    ),
    Product(
        name="Industrial Degreaser",
        description="Heavy-duty degreaser for kitchens, machinery, and industrial surfaces.",
        price=19000.00,
        category="Kitchen & Industrial",
        image_url="https://via.placeholder.com/400x300?text=Industrial+Degreaser",
    ),
]


@app.on_event("startup")
def on_startup():
    drop_contact_table()
    create_db_and_tables()
    with Session(engine) as session:
        existing = session.exec(select(Product)).first()
        if not existing:
            session.add_all(SEED_PRODUCTS)
            session.commit()
            print(f"[startup] Seeded {len(SEED_PRODUCTS)} products.")
        else:
            print("[startup] Products table already has data — skipping seed.")


@app.get("/")
def root():
    return {"message": "Awaproducts API is running"}


# --- Products ---

@app.get("/api/products", response_model=list[Product])
def get_products(session: Session = Depends(get_session)):
    return session.exec(select(Product)).all()


@app.post("/api/products", response_model=Product, status_code=201)
def create_product(product: Product, session: Session = Depends(get_session)):
    session.add(product)
    session.commit()
    session.refresh(product)
    return product


# --- Contact ---

@app.post("/api/contact", response_model=ContactInquiry, status_code=201)
def submit_inquiry(inquiry: ContactInquiry, session: Session = Depends(get_session)):
    session.add(inquiry)
    session.commit()
    session.refresh(inquiry)
    return inquiry


# --- Admin ---

@app.get("/api/admin/inquiries", response_model=list[ContactInquiry])
def list_inquiries(session: Session = Depends(get_session)):
    return session.exec(select(ContactInquiry)).all()
