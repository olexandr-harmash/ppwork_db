import Offer from "../../../core/model/Offer";
import Sale from "../../../core/model/Sale";
import Variety from "../../../core/model/Veriety";
import OfferControllerImp from "../OfferController";
import fs from "fs";

export default function Create(this: OfferControllerImp) {
  return async (req, res) => {
    try {
      const { name, cost } = req.body;
      const { varietiesIds, sales } = req.offerData;

      const varieties = await this.varietyRepo.findByPks(varietiesIds);

      const allIdsAreFounded = varieties.length === varietiesIds.length;

      if (!allIdsAreFounded) {
        return this.clientError(res, "Some IDs are not included in database.");
      }

      const allSalesHaveMatchedVarieties = sales.every((s) =>
        s.varieties.every((id) => varietiesIds.find((i) => i === id))
      );

      if (!allSalesHaveMatchedVarieties) {
        return this.clientError(res, "Some sale have wrong variety id.");
      }

      const vari = varieties.map((v) =>
        Variety.create(
          {
            name: v.getName(),
            value: v.getValue(),
            additionalCost: v.getAdditionalCost(),
            multiplyCost: v.getMultiplyCost(),
          },
          v.getId()
        )
      );

      const s = sales.map((s) =>
        Sale.create({
          varieties: varieties.filter((v) =>
            varietiesIds.find((id) => id === v.getId())
          ),
          multiply: s.multiply,
        })
      );

      const offer = Offer.create({
        varieties: vari,
        name,
        cost,
        sales: s,
        imgUrls: [],
      });

      loadStatic(req.files.images, offer);

      await this.offerRepo.create(offer);

      return this.ok(res);
    } catch (error) {
      return this.fail(res, error);
    }
  };
}

function loadStatic(images, offer: Offer) {
  const urls: string[] = [];
  const dir = `./static/${offer.getId()}/`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  for (const file of [images].flat()) {
    const url = dir + file.name;
    file.mv(url);
    urls.push(`/${offer.getId()}/${file.name}`);
  }

  offer.setImgUrls(urls);
  return offer;
}
