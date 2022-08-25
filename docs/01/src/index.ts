import {AppDataSource} from "./data-source"
import {User} from "./entity/User"
import {PhotoMetadata} from "./entity/PhotoMetadata";
import {Photo} from "./entity/Photo";

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

    const photo = new Photo()
    photo.user = user
    photo.name = "Me and Bears"
    photo.description = "I am near polar bears"
    photo.filename = "photo-with-bears.jpg"
    photo.views = 1
    photo.isPublished = true

// create a photo metadata
    const metadata = new PhotoMetadata()
    metadata.height = 640
    metadata.width = 480
    metadata.compressed = true
    metadata.comment = "cybershoot"
    metadata.orientation = "portrait"
    metadata.photo = photo // this way we connect them

// get entity repositories
    const photoRepository = AppDataSource.getRepository(Photo)
    const metadataRepository = AppDataSource.getRepository(PhotoMetadata)

// first we should save a photo
    await photoRepository.save(photo)

// photo is saved. Now we need to save a photo metadata
    await metadataRepository.save(metadata)

// done
    console.log(
        "Metadata is saved, and the relation between metadata and photo is created in the database too",
    )

    const photos = await photoRepository.find({
        relations: {
            metadata: true,
        },
    })

    console.log(photos)

        //queryBuilder
    const photosWith= await AppDataSource.getRepository(Photo)
        .createQueryBuilder("photo")
        .innerJoinAndSelect("photo.metadata", "metadata")
        .getMany()

    console.log('Photo with metadata and querybuilder',photosWith)

}).catch(error => console.log(error))
