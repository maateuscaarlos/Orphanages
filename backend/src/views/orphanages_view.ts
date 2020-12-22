import Orphanage from "../models/Orphanage";
import images_views from "./images_views";

interface OrphanagesView{
    id:number;
    name:string;
    latitude:number;
    longitude:number;
    about:string;
    instuctions:string;
    opening_hours:string;
    open_on_weekends:boolean;
    images:ImagesView[];
}
interface ImagesView{
  id:number;
  url:string
}

export default{
  render(orphanage: Orphanage):OrphanagesView{
    return{
      id:orphanage.id,
      name:orphanage.name,
      latitude:orphanage.latitude,
      longitude:orphanage.longitude,
      about:orphanage.about,
      instuctions:orphanage.instuctions,
      opening_hours:orphanage.opening_hours,
      open_on_weekends:orphanage.open_on_weekends,
      images:images_views.renderMany(orphanage.images),
    };
  },
  renderMany(orphanages:Orphanage[]):OrphanagesView[]{
    return orphanages.map(Orphanage=>this.render(Orphanage));

  }
}
