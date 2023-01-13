import useNFTContract from "../hooks/nft.hook";
import useMarketplaceContract from "../hooks/marketplace.hook";
import useWeb3 from "../hooks/web3.hook";
import nftApi from "../api/nft";

const getMarketDino = async () => {
  const marketContract = useMarketplaceContract();
  const marketDinos = await getDinosByOwner(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS
  );
  const web3 = useWeb3();
  let auctions = await Promise.all(
    marketDinos.map(async (dino) => {
      const auction = await marketContract.methods
        .getAuction(dino.nftId)
        .call();
      return {
        ...dino,
        ...auction,
        startingPrice: web3.utils.fromWei(`${auction.startingPrice}`),
        endingPrice: web3.utils.fromWei(`${auction.endingPrice}`),
      };
    })
  );
  return auctions;
};

const ClassId = {
  NOVIS: 1,
  AQUIS: 2,
  TERROT: 3,
};
const getClassName = (classId) => {
  switch (classId) {
    case ClassId.NOVIS:
      return "Novis";
    case ClassId.AQUIS:
      return "Aquis";
    case ClassId.TERROT:
      return "Terrot";
    default:
      return "Lottery";
  }
};
const getClassNameByGenes = (genes) => {
  if (!genes) return;
  const classId = `${genes}`.slice(1, 2);
  switch (classId) {
    case ClassId.NOVIS.toString():
      return "Novis";
    case ClassId.AQUIS.toString():
      return "Aquis";
    case ClassId.TERROT.toString():
      return "Terrot";
    default:
      return "Lottery";
  }
};

export const getClassHtmlByGenes = (genes) => {
  if (!genes) return;
  const classId = `${genes}`.slice(1, 2);
  switch (classId) {
    case ClassId.NOVIS.toString():
      return "novis";
    case ClassId.AQUIS.toString():
      return "aquis";
    case ClassId.TERROT.toString():
      return "terrot";
    default:
      return "lottery";
  }
};

const getClassByGenes = (genes) => {
  if (!genes) return;
  const classId = `${genes}`.slice(0, 2);
  return classId;
};

const getRaritiesByGenes = (genes) => {
  const classId = `${genes}`.slice(2);
  return classId;
};

const getRarityByGenes = (genes) => {
  if (!genes) return;
  const rarityId = `${genes}`.slice(2, 4);
  return rarityId;
};

const getDinosByOwner = async (ownerAddress) => {
  const nftContract = useNFTContract();
  const dinoIds = (
    await nftContract.methods.getDinosByOwner(ownerAddress).call()
  ).filter((dinoId) => !!~~dinoId);
  const dinos = await nftApi.getDinoByIds(dinoIds);
  return dinos;
};

const formatPrice = (number) => {
  const transfernumber = Number(number).toLocaleString();
  return transfernumber;
};
const RarityName = {
  NORMAL: 1,
  RARE: 2,
  SUPER: 3,
  LEGENDARY: 4,
  MYSTIC: 5,
};
const getRarityName = (rarityId) => {
  switch (rarityId) {
    case RarityName.NORMAL:
      return "Normal";
    case RarityName.RARE:
      return "Rare";
    case RarityName.SUPER:
      return "Super Rare";
    case RarityName.LEGENDARY:
      return "Legendary";
    case RarityName.MYSTIC:
      return "Mystic";
    default:
      return "Not Found";
  }
};

const getRarityNameByGenes = (genes) => {
  if (!genes) return;
  const rarityId = `${genes}`.slice(3, 4);
  switch (rarityId) {
    case RarityName.NORMAL.toString():
      return "Normal";
    case RarityName.RARE.toString():
      return "Rare";
    case RarityName.SUPER.toString():
      return "Super Rare";
    case RarityName.LEGENDARY.toString():
      return "Legendary";
    case RarityName.MYSTIC.toString():
      return "Mystic";
    default:
      return "Not Found";
  }
};

const getRarityImageByGenes = (genes) => {
  if (!genes) return;
  const rarityId = `${genes}`.slice(3, 4);
  switch (rarityId) {
    case RarityName.NORMAL.toString():
      return "normal";
    case RarityName.RARE.toString():
      return "rare";
    case RarityName.SUPER.toString():
      return "super-rare";
    case RarityName.LEGENDARY.toString():
      return "legandary";
    case RarityName.MYSTIC.toString():
      return "mystic";
    default:
      return "Not Found";
  }
};
const DinoNameByGenes = {
  FLAIR: 1111,
  SIZZLE: 1112,
  FERVIS: 1113,
  SCORCHIS: 1114,
  INCENDIUS: 1115,
  DEW: 1211,
  AQUIFIS: 1212,
  OCEA: 1213,
  GEYSIS: 1214,
  HYDRIS: 1215,
  PEBBLE: 1311,
  BREYZE: 1312,
  HURICAN: 1313,
  CERULLE: 1314,
  VOX: 1315,
};

const getDinoNameByGenes = (dinoGenes) => {
  if (!dinoGenes) return "";
  const genes = `${dinoGenes}`;
  switch (genes) {
    case DinoNameByGenes.FLAIR.toString():
      return "Flair";
    case DinoNameByGenes.SIZZLE.toString():
      return "Sizzle";
    case DinoNameByGenes.FERVIS.toString():
      return "Fervis";
    case DinoNameByGenes.SCORCHIS.toString():
      return "Scorchis";
    case DinoNameByGenes.INCENDIUS.toString():
      return "Incendius";
    case DinoNameByGenes.DEW.toString():
      return "Dew";
    case DinoNameByGenes.AQUIFIS.toString():
      return "Aquifis";
    case DinoNameByGenes.OCEA.toString():
      return "Ocea";
    case DinoNameByGenes.GEYSIS.toString():
      return "Geysis";
    case DinoNameByGenes.HYDRIS.toString():
      return "Hydris";
    case DinoNameByGenes.PEBBLE.toString():
      return "Pebble";
    case DinoNameByGenes.BREYZE.toString():
      return "Breyze";
    case DinoNameByGenes.HURICAN.toString():
      return "Hurican";
    case DinoNameByGenes.CERULLE.toString():
      return "Cerulle";
    case DinoNameByGenes.VOX.toString():
      return "Vox";
  }
};

export {
  getDinosByOwner,
  getClassName,
  getRarityName,
  formatPrice,
  getClassNameByGenes,
  getClassByGenes,
  getRarityByGenes,
  getRarityNameByGenes,
  getRaritiesByGenes,
  getDinoNameByGenes,
  getMarketDino,
  getRarityImageByGenes,
};
