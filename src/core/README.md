# Offer Management System Core Architect

This project implements an Offer Management System with a modular architecture designed for flexibility and scalability.

## Table of Contents

- [Entities](#entities)
  - [BaseOfferData](#baseofferdata)
  - [CertainItem](#certainitem)
  - [Offer](#offer)
  - [OfferSale](#offersale)
  - [OfferService](#offerservice)
  - [OfferVariety](#offervariety)
  - [Entity](#entity)
  - [Uuid](#uuid)

## Entities

### BaseOfferData

Base class for offer data entities.

#### Properties

- `name`: string - The name of the offer data.
- `cost`: number - The base cost of the offer data.
- `varieties`: OfferVariaty[] - Array of varieties associated with the offer data.

### CertainItem

Class representing a certain item with specific properties.

#### Properties

- `props`: CertainItemAttributes - The attributes of the certain item.

#### Methods

- `getCost(): number` - Get the total cost of the certain item.

### Offer

Class representing an offer.

#### Properties

- `props`: OfferAttributes - The attributes of the offer.
- `varietyMap`: { [key: string]: string[] } - A map of variety attributes.
- `serviceMap`: { [key: string]: string[] } - A map of service attributes.

#### Methods

- `getVarietyMap(): { [key: string]: string[] }` - Get a map of variety attributes.
- `getServiceMap(): { [key: string]: string[] }` - Get a map of service attributes.
- `devideByAttributes(attributes: OfferVariaty[]): CertainItem` - Divide the offer into a certain item based on provided attributes.

### OfferSale

Class representing a sale associated with an offer.

#### Properties

- `props`: OfferSaleAttributes - The attributes of the sale.

#### Methods

- `getSale(): number` - Get the multiplier of the sale.
- `isAllSalesMatched(attributes: OfferVariaty[]): boolean` - Check if all fariaties are matched.
- `isVarietiesExist(attributes: OfferVariety[]): boolean` - Check if all fariaties are matched.

### OfferService

Class representing a service associated with an offer.

#### Properties

- `props`: OfferServiceAttributes - The attributes of the service.

#### Methods

- `getCost(): number` - Get the cost of the service.

### OfferVariety

Class representing a variety of an offer.

#### Properties

- `props`: OfferVarietyAttributes - The attributes of the variety.

### Entity

Class representing a generic entity.

#### Properties

- `id`: Uuid - The unique identifier of the entity.
- `props`: T - The properties of the entity.

### Uuid

Class representing a universally unique identifier.

#### Methods

- `getStringValue(): string` - Get the string value of the UUID.