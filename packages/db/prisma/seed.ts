import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.upsert({
        where:{email:'dhane9040@gmail.com'},
        update: {},
        create: {
            email:'dhane9040@gmail.com',
            username:"tourist",
            firstName:"Dhaneshwar",
            lastName:"Guiyan",
            password:"1234"
        }
    })
    const user2 = await prisma.user.upsert({
      where:{email:'dhane6206@gmail.com'},
      update: {},
      create: {
          email:'dhane6206@gmail.com',
          username:"pictur_esque",
          firstName:"Dhaneshwar",
          lastName:"Guiyan",
          password:"1234"
      }
  })
    const map = await prisma.maps.upsert({
        where:{name:'Wild forest'},
        update:{},
        create:{
            name:"Wild Forest",
            tileSet:"assets/forest3.json",
            layers:{
                create:
                [
                    {name:"floor",depth:0},
                    {name:"decoration1",depth:0},
                    {name:"border",depth:0},
                    {name:"decoration2",depth:0},
                    {name:"decoration3",depth:0},
                    {name:"foreground",depth:1},
                    {name:"obstacles",depth:1},
                    {name:"spawn",depth:0}
                ]
            },
            assets:{
                create:
                [
                    {path:"assets/magecity.png",name:"magecity"},
                    {path:"assets/container.png",name:"container"}
                ]
            }
        }
    })

    const sprites = await prisma.spriteAssets.upsert({
        where:{key:1},
        update:{},
        create:{
            path:"assets/sprite.png",
            frameWidth:16,
            frameHeight:16,
            sprites:{
                create:[
                    {
                        initialState:0,
                        animations:{
                            create:[
                                {
                                  key:"left",
                                  frames:[1,7,1,13],
                                },
                                {
                                  key:"right",
                                  frames:[1,7,1,13],
                                },
                                {
                                  key:"up",
                                  frames: [2,8,2,14],
                                },{
                                  key:"down",
                                  frames:[0,6,0,12],
                                }
                              ]
                        }
                    },
                    {
                        initialState:3,
                        animations:{
                            create:[
                                {
                                  key:"left",
                                  frames:[4,10,4,16],
                                },
                                {
                                  key:"right",
                                  frames:[4,10,4,16],
                                },
                                {
                                  key:"up",
                                  frames: [5,11,5,17],
                                },{
                                  key:"down",
                                  frames:[3,9,3,15],
                                }
                              ]
                        }
                    },
                    {
                        initialState:18,
                        animations:{
                            create:[
                                {
                                  key:"left",
                                  frames:[19,25,19,31],
                                },
                                {
                                  key:"right",
                                  frames:[19,25,19,31],
                                },
                                {
                                  key:"up",
                                  frames: [20,26,20,32],
                                },{
                                  key:"down",
                                  frames:[18,24,18,30],
                                }
                              ]
                        }
                    },
                    {
                        initialState:21,
                        animations:{
                            create:[
                                {
                                  key:"left",
                                  frames:[22,28,22,34],
                                },
                                {
                                  key:"right",
                                  frames:[22,28,22,34],
                                },
                                {
                                  key:"up",
                                  frames: [23,29,23,35],
                                },{
                                  key:"down",
                                  frames:[21,27,21,33],
                                }
                              ]
                        }
                    }
                ]
            }
        }
    })
}
main().then(async() => {
    await prisma.$disconnect()
}).catch(async(e)=>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})