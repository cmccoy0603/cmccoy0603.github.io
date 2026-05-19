import { PortfolioGameDTO } from "../models/portfolio-game.dto";

export const portfolioGames: PortfolioGameDTO[] = [
    { 
        id: 1, 
        title: 'All Aboard the Twilight Train',
        description: 'Narrative focused game where you try to find why you\'re on the train.',
        image: '/assets/Games/TwilightTrain/Twilight-Train-Main.png'
    },
    { 
        id: 2, 
        title: '3DChromo Twist',
        description: 'Look into the microscope to rearrange bins in different microscopic structures to get the correct structure',
        image:'/assets/Games/3DChromoTwist/3DChromoTwist-Main.png'
    },
    { 
        id: 3, 
        title: 'Marching Huts',
        description: 'Compete against other players in a fast paced RTS where you build and command an army to destroy the other players huts',
        image: '/assets/Games/MarchingHuts/MarchingHuts-Main.png'
    },
    {
        id: 4,
        title: 'GOAP Village Simulater',
        description: 'Watch different villagers go about their day as they make decisions based on their needs and desires in this village simulator',
        image: '/assets/Games/GOAPVillageSimulator/GOAPVillageSimulator-Main.png'
    },
    {
        id: 5,
        title: 'Process of Elimination',
        description: '2D Roguelike with a procedurally generated lab to explore and escape while battling vermin and buying upgrades',
        image: '/assets/Games/ProcessOfElimination/ProcessOfElimination-Main.png'
    },
    {
        id: 6,
        title: 'Game jam games',
        description: 'All of the games I\'ve made for game jams. Most are small but can be played right here on the website.',
        image: '/assets/Games/GameJamGames/GameJamGames-Main.png'
    }
];