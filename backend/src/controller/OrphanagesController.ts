import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import  * as Yup from 'yup';
import Orphanages from '../models/Orphanage'
import orphanagesView from '../views/orphanages_view';

const OrphanagesController = {

    async create(request:Request, response:Response):Promise<Orphanages | any>{

            const {name,latitude,longitude,about,instuctions,opening_hours,open_on_weekends} = request.body;

            const orphanagesRepository = getRepository(Orphanages);

            const reqImages = request.files as Express.Multer.File[];
            const images = reqImages.map(img => {
              return{path:img.filename};
            });

            const dataOrphanage = {
              name,
              latitude,
              longitude,
              about,
              instuctions,
              opening_hours,
              open_on_weekends: open_on_weekends === 'true',
              images,
            };
            //Criando o esquema para validação dos dados
            const schema = Yup.object().shape({
              name:Yup.string().trim().required(),
              latitude:Yup.number().required(),
              longitude:Yup.number().required(),
              about:Yup.string().required().max(300),
              instuctions:Yup.string().required(),
              opening_hours:Yup.string().required(),
              open_on_weekends:Yup.boolean().required(),
              images:Yup.array(
                Yup.object().shape({
                  path:Yup.string().required(),
              }),
              ),
            });

            await schema.validate(dataOrphanage, {
              abortEarly:false, //faz com o que todas as msg de error apareçam
            });

            const orphanages = orphanagesRepository.create(dataOrphanage);

            await orphanagesRepository.save(orphanages);

            return response.status(201).json(orphanages);

    },
    async index(request:Request, response:Response):Promise<Orphanages|any>{
        const orphanagesRepository = getRepository(Orphanages);
        const orphanage = await orphanagesRepository.find({
          relations:['images'],
        });
        return response.status(200).json(orphanagesView.renderMany(orphanage));
    },
    async show(request:Request, response:Response):Promise<Orphanages|any>{
      const {id} = request.params;
      const orphanagesRepository = getRepository(Orphanages);
      const orphanage = await orphanagesRepository.findOneOrFail(id,{
        relations:['images'],
      });
      return response.status(200).json(orphanagesView.render(orphanage));
    },
};
export default OrphanagesController;
