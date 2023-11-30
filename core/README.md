# Project Name

Description of your project.

## Table of Contents

- [Entities](#entities)
  - [BaseOfferData](#baseofferdata)
  - [BaseOfferProps](#baseofferprops)
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
- `sales`: BaseOfferProps[] - Array of sales associated with the offer data.

### BaseOfferProps

Base class for offer properties entities.

#### Properties

- `attributes`: { [key: string]: string } - Key-value pairs representing the attributes of the offer.

#### Methods

- `getKey(): string` - Get the key of the first attribute.
- `getValue(key: string): string` - Get the value of a specific attribute.
- `getAttributes(): { [key: string]: string }` - Get all attributes.
- `getAmountOfAttributes(): number` - Get the number of attributes.
- `ifAttributeExists(key: string, value: string): boolean` - Check if a specific attribute exists.
- `getKeys(): string[]` - Get all keys of the attributes.

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
- `salesMap`: { [key: string]: string[] } - A map of sales attributes.
- `servicesMap`: { [key: string]: string[] } - A map of service attributes.

#### Methods

- `getOfferMap(): { [key: string]: string[] }` - Get a map of sales attributes.
- `getCostsMap(): { [key: string]: string[] }` - Get a map of service attributes.
- `devideByAttributes(attributes: BaseOfferProps): CertainItem` - Divide the offer into a certain item based on provided attributes.

### OfferSale

Class representing a sale associated with an offer.

#### Properties

- `props`: OfferSaleAttributes - The attributes of the sale.

#### Methods

- `getMultiply(): number` - Get the multiplier of the sale.
- `isAllMultiplyKeysMatched(attributes: BaseOfferProps): boolean` - Check if all multiply keys are matched.

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