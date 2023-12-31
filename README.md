# Offer Management System

This project implements an Offer Management System with a modular architecture designed for flexibility and scalability.

# File Structure

The project is organized with the following directory and file structure:

## app/
- **app/**: Main application directory.
- **command/**: Application commands.
- **baseapp**: Basic components and services of the application.

## config/
- **config/**: Application configuration files.

## nginx/
- **nginx/**: Configurations for Nginx.

## db/
- **db/models/**: Database models.

## module/
- **module/**: Application modules.
  - **controller/**: Controllers for modules.
    - **crud/**: Controllers for CRUD operations.
    - **policies/**: Controller policies.
    - **baseController**: Base controller.
    - **controller**: General controllers.
  - **repo/**: Module repositories.

## mapper/
- **mapper/**: Mappers for data transformation.

## dto/
- **dto/**: Data transfer objects.

## router/
- **router/**: Application routes.
  - **middlewares/**: Middlewares for routes.
  - **v1/**: Route versions.

## logger
- **logger**: Application logging.

Each directory contains its set of files and subdirectories for logical grouping of the application's functionality. This structure is designed to facilitate understanding and maintenance of the project.

## Project Structure

- `BaseOfferData`: Abstract class representing the basic attributes of an offer.
- `Offer`: Class representing a specific offer with associated services and multipliers.
- `OfferSale`: Class representing a sale associated with an offer, including a multiplier.
- `OfferVariety`: Class representing a variety of an offer.
- `CertainItem`: Class representing a certain item with specific properties based on an offer.
- `OfferService`: Class representing a variety with additional cost.
- `Entity`: Base class representing a generic entity with a unique identifier.
- `Uuid`: Class representing a universally unique identifier.

## Getting Started

Follow these steps to set up and run the Offer Management System locally using Docker Compose.

### Prerequisites

Make sure you have Docker and Docker Compose installed on your machine.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/olexandr-harmash/ppwork_db.git
   cd your-repo-directory
   docker compose up
   ```

## Learn More

To gain a deeper understanding of the project's architecture and code, please refer to the respective documentation and comments within each class file.

1. **BaseOfferData**

   - [BaseOfferData Documentation](https://github.com/olexandr-harmash/ppwork_db/blob/development/src/core/README.md)

2. **CertainItem**

   - [CertainItem Documentation](https://github.com/olexandr-harmash/ppwork_db/blob/development/src/core/README.md)

3. **Offer**

   - [Offer Documentation](https://github.com/olexandr-harmash/ppwork_db/blob/development/src/core/README.md)

4. **OfferSale**

   - [OfferSale Documentation](https://github.com/olexandr-harmash/ppwork_db/blob/development/src/core/README.md)

5. **OfferVariety**

   - [OfferVariety Documentation](https://github.com/olexandr-harmash/ppwork_db/blob/development/src/core/README.md)

6. **Entity**

   - [Entity Documentation](https://github.com/olexandr-harmash/ppwork_db/blob/development/src/core/README.md)

7. **Uuid**
   - [Uuid Documentation](https://github.com/olexandr-harmash/ppwork_db/blob/development/src/core/README.md)

8. **OfferService**
   - [OfferService Documentation](https://github.com/olexandr-harmash/ppwork_db/blob/development/src/core/README.md)
