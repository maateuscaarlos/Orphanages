import Images from "../models/Images";

interface ImagesView{
  id:number;
  url:string
}

export default{
  render(image:Images):ImagesView{
    return{
      id:image.id,
      url:`http:192.168.2.12:3333/upload/${image.path}`,//192.168.1.10:3333
    };
  },
  renderMany(images:Images[]):ImagesView[]{
    return images.map(image=>this.render(image));
  }
}
