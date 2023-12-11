import Offer from "../../../core/model/Offer";
import OfferSale from "../../../core/model/OfferSale";
import OfferService from "../../../core/model/OfferService";
import OfferVariety from "../../../core/model/OfferVariety";
import { CreateOfferDto } from "../../dto/OfferDto";
import OfferControllerImp from "../OfferController";
import fs from "fs";

export default function Create(this: OfferControllerImp) {
  return async (req, res) => {
    try {
      const createDto: CreateOfferDto = req.body;

      const { varietiesData, servicesData, salesData } = req.offerData;

      const varieties = varietiesData.map((variety) =>
        OfferVariety.create(variety)
      );

      const services = servicesData.map((service) =>
        OfferService.create(service)
      );

      const sales = salesData.map((sale) => {
        return OfferSale.create({
          varieties: varieties
            .concat(services)
            .filter((variety) =>
              sale.varieties.find((value) => value.value === variety.getValue())
            ),
          sale: sale.sale,
        });
      });

      let offer = Offer.create({
        imgUrls: [],
        name: createDto.name,
        cost: createDto.cost,
        sales: sales,
        services: services,
        varieties: varieties,
      });

      offer = await loadStatic(req, offer);

      await this.repo.create(offer);

      return this.ok(res);
    } catch (error) {
      return this.fail(res, error);
    }
  };
}

function loadStatic(req, offer: Offer) {
  const urls: string[] = [];
  const dir = `./static/${offer.getId()}/`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  for (const file of [req.files.images].flat()) {
    const url = dir + file.name;
    file.mv(url);
    urls.push(`/${offer.getId()}/${file.name}`);
  }

  offer.setImgUrls(urls);
  return offer;
}
