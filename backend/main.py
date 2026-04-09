from fastapi import FastAPI, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from database import engine, create_db_and_tables, drop_contact_table, get_session
from models import Product, ContactInquiry
from email_service import send_contact_notification

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
        image_url="https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&h=400&fit=crop",
    ),
    Product(
        name="Heavy Duty Floor Cleaner",
        description="Industrial-strength floor cleaner suitable for tiles, marble, and hardwood.",
        price=7200.00,
        category="Floor Care",
        image_url="https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&h=400&fit=crop",
    ),
    Product(
        name="Multi-Surface Disinfectant",
        description="Broad-spectrum disinfectant that eliminates 99.9% of bacteria and viruses.",
        price=9800.00,
        category="Disinfectants",
        image_url="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    ),
    Product(
        name="Bathroom Descaler",
        description="Powerful descaling agent for removing limescale and mineral deposits.",
        price=6400.00,
        category="Bathroom Care",
        image_url="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop",
    ),
    Product(
        name="Industrial Degreaser",
        description="Heavy-duty degreaser for kitchens, machinery, and industrial surfaces.",
        price=19000.00,
        category="Kitchen & Industrial",
        image_url="https://plus.unsplash.com/premium_photo-1664192424595-482dd94d9c45?w=800&auto=format&fit=crop&q=80",
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
async def submit_inquiry(
    inquiry: ContactInquiry,
    background_tasks: BackgroundTasks,
    session: Session = Depends(get_session),
):
    session.add(inquiry)
    session.commit()
    session.refresh(inquiry)
    background_tasks.add_task(
        send_contact_notification,
        name=inquiry.name,
        email=inquiry.email,
        subject=inquiry.subject,
        message=inquiry.message,
        phone=inquiry.phone,
    )
    return inquiry


# --- Admin ---

@app.get("/api/admin/inquiries", response_model=list[ContactInquiry])
def list_inquiries(session: Session = Depends(get_session)):
    return session.exec(select(ContactInquiry)).all()
