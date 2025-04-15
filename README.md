# ALTech PDF – Backend

ALTech PDF is a powerful, modular PDF processing platform built with Django and Django REST Framework.  
Its purpose is to provide a professional alternative to tools like Adobe Acrobat, but lightweight, free, and open-source.

## Current Features
- User registration, login, token-based authentication (JWT)
- Secure password change and user profile endpoints
- Modular backend structure: auth, analytics, merge, split, delete, reorder, file_manager
- Integrated unit and integration testing (100% coverage)

## Tech Stack
- Python 3.11
- Django 5.2
- Django REST Framework
- SQLite (dev) / PostgreSQL (planned)
- Pytest (tests)
- Git & GitHub

## Project Status
This project is in active development.  
We are currently focusing on completing backend functionalities, testing coverage, and preparing the API for frontend/mobile clients.

## Installation (Local)
```bash
git clone https://github.com/Alexandru95Py/altech-pdf.git
cd altech-pdf
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Alexandru95Py/altech-pdf
Advanced PDF processing backend with JWT authentication, analytics, and modular API – built with Django & DRF. - Alexandru95Py/altech-pdf
My husband ❤️ My soul ❤️ My power 💪
Alexandru Georgian Goga
# ALTech PDF – Backend

*ALTech PDF* is a powerful, modular platform designed to offer users a complete and efficient solution for PDF file manipulation. The application is built with modern technologies like *Django* and *Django REST Framework*, and it aims to combine performance, flexibility, and ease of use in one unified experience.

## Vision

ALTech PDF is more than just a tool — it's a platform that aims to simplify PDF operations for everyday users, freelancers, and businesses alike. Its purpose is to become a *real, efficient and cost-accessible alternative* for anyone needing professional-grade PDF features without the complexity or high costs often found in other solutions.

This application is *not designed to compete with corporate giants*, but to offer a *well-balanced, pleasant, and scalable experience*, with advanced features that are both powerful and user-friendly. The focus is on real utility, performance, and modularity — everything a user needs, nothing more complicated than necessary.

---

## ✅ Current Features (Phase 1)
- User registration, login, token-based authentication (JWT)
- Secure password change and profile update endpoints
- Modular backend structure:
  - auth (authentication)
  - analytics (user and feature usage tracking)
  - merge, split, delete, reorder (PDF file operations)
  - file_manager (backend handling for file operations)
- 100% test coverage using *Pytest*
- Clean, scalable code architecture, ready for frontend & mobile integration

---

## ⚙️ Tech Stack
- *Python 3.11*
- *Django 5.2.1*
- *Django REST Framework*
- *SQLite* for development (PostgreSQL planned for production)
- *Pytest* for unit & integration testing
- *Git & GitHub* for version control

---

## 🔮 What’s Coming Next

The application is designed to *grow rapidly*, with many advanced modules already planned and in progress, including:
- PDF QR code generation and tracking
- File versioning and history
- Scheduled PDF automation (merge/split at intervals)
- Notification system
- Role-based access for multi-user collaboration
- Admin dashboard with insights and usage statistics
- RESTful API documentation for third-party integration
- Deployment-ready mobile apps (iOS & Android)

And other *powerful and useful features* to come.

---

## 🚀 Project Status

*Currently in active backend development.*  
All components are modular and tested, ensuring long-term maintainability and scalability.

As development continues, ALTech PDF will evolve into a *strong, real-world alternative* for those who need *modern PDF tools* without unnecessary complications or excessive costs.

---

Made with discipline, vision and purpose.
