import { PortfolioGameDTO } from "../models/portfolio-game.dto";

export const portfolioGames: PortfolioGameDTO[] = [
    { 
        id: 1, 
        title: 'All Aboard the Twilight Train',
        description: 'Narrative focused game where you try to find why you\'re on the train.',
        image: '/assets/Games/TwilightTrain/Twilight-Train-Main.png',
        modalKey: 'twilight-train',
        modalContent: {
            summary: 'A story-first mystery set on a train where every conversation pushes you closer to the truth.',
            highlights: [
                'Dialogue-driven progression',
                'Mood-focused exploration',
                'A mystery that unfolds through repeated interactions',
            ],
            sections: [
                {
                    heading: 'What makes it custom',
                    body: 'This modal can lean into the narrative tone with a bespoke layout, a stronger emphasis on atmosphere, and space for key story beats.',
                },
                {
                    heading: 'Best fit',
                    body: 'Use this pattern when a game needs more than a short summary and a few metadata fields.',
                },
            ],
        }
    },
    { 
        id: 2, 
        title: '3DChromo Twist',
        description: 'Look into the microscope to rearrange bins in different microscopic structures to get the correct structure',
        image:'/assets/Games/3DChromoTwist/3DChromoTwist-Main.png',
        modalKey: '3dchromo-twist',
        iframeUrl: 'https://supremecool.itch.io/demonpunter'
    },
    { 
        id: 3, 
        title: 'Marching Huts',
        description: 'Compete against other players in a fast paced RTS where you build and command an army to destroy the other players huts',
        image: '/assets/Games/MarchingHuts/MarchingHuts-Main.png',
        modalKey: 'generic'
    },
    {
        id: 4,
        title: 'GOAP Village Simulater',
        description: 'Watch different villagers go about their day as they make decisions based on their needs and desires in this village simulator',
        image: '/assets/Games/GOAPVillageSimulator/GOAPVillageSimulator-Main.png',
        modalKey: 'generic'
    },
    {
        id: 5,
        title: 'Process of Elimination',
        description: '2D Roguelike with a procedurally generated lab to explore and escape while battling vermin and buying upgrades',
        image: '/assets/Games/ProcessOfElimination/ProcessOfElimination-Main.png',
        modalKey: 'process-of-elimination',
        modalContent: {
            summary: 'A replayable lab escape game built around procedural layouts, enemy encounters, and upgrade choices.',
            highlights: [
                'Procedurally generated spaces',
                'Roguelike progression',
                'Upgrade-driven replayability',
            ],
            sections: [
                {
                    heading: 'Why this one is bespoke',
                    body: 'The modal can give the game its own pacing, highlight the run-based structure, and show the systems that make each playthrough different.',
                },
                {
                    heading: 'What to surface here',
                    body: 'This is a good place for screenshots, gameplay loops, enemy or upgrade callouts, and a direct link to the playable build if one exists.',
                },
            ],
        }
    },
    {
        id: 6,
        title: 'Game jam games',
        description: 'All of the games I\'ve made for game jams. Most are small but can be played right here on the website.',
        image: '/assets/Games/GameJamGames/GameJamGames-Main.png',
        modalKey: 'generic'
    }
];