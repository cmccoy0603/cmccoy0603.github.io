import { PortfolioGameDTO } from "../models/portfolio-game.dto";

export const portfolioGames: PortfolioGameDTO[] = [
    { 
        id: 1, 
        title: 'All Aboard the Twilight Train',
        description: 'Main gameplay programmer for school capstone project.'
        + '\n\nImplemented branching dialogue system and other gameplay systems.',
        skills: [
            'Unreal Engine',
            'Dialogue systems',
            'C++'
        ],
        year: 2025,
        section: 'school-projects',
        image: '/assets/Games/TwilightTrain/Twilight-Train-Main.png',
        modalKey: 'twilight-train',
        modalContent: {
            summary: '',
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
        },
        screenshots: [
            '/assets/Games/TwilightTrain/Twilight-Train-Main.png',
            '/assets/Games/TwilightTrain/Twilight-Train-Screenshot-1.jpg',

        ]
    },
    { 
        id: 2, 
        title: '3DChromo Twist',
        description: 'Ported and expanded java prototype to be web playable as part of a research assistant role.'
            + '\n\nUses webserver to store leaderboard data and store and retrieve structure data',
        skills: [
            'Godot',
            'Web Server',
            'API',
        ],
        year: 2026,
        section: 'school-projects',
        image:'/assets/Games/3DChromoTwist/3DChromoTwist-Main.png',
        screenshots: [
            '/assets/Games/3DChromoTwist/3DChromoTwist-Main.png',
            '/assets/Games/3DChromoTwist/3DChromoTwist-Screenshot-1.png',
            '/assets/Games/3DChromoTwist/3DChromoTwist-Screenshot-2.png',
            '/assets/Games/3DChromoTwist/3DChromoTwist-Screenshot-3.png',
            '/assets/Games/3DChromoTwist/3DChromoTwist-Screenshot-4.png',
        ],
        modalKey: '3dchromo-twist',
        iframeUrl: '/assets/Games/3DChromoTwist/3DChromoTwist/index.html'
    },
    { 
        id: 3, 
        title: 'Marching Huts',
        description: 'Created networked rts game using Unreal\'s replication system.'
            +'\n\nUsed state trees for unit AI.',
        skills: [
            'Unreal Engine',
            'Networking',
            'AI',
            'C++'
        ],
        year: 2026,
        section: 'school-projects',
        image: '/assets/Games/MarchingHuts/MarchingHuts-Main.png',
        modalKey: 'generic'
    },
    {
        id: 4,
        title: 'GOAP Village Simulater',
        description: 'Created prototype utilizing goal oriented action planning (GOAP) to simulate a village.'
            +'\n\nVillagers can preform different actions based on their job to fulfil their basic survival goals',
        skills: [
            'Unity',
            'GOAP AI',
            'C#',
        ],
        year: 2026,
        section: 'school-projects',
        image: '/assets/Games/GOAPVillageSimulator/GOAPVillageSimulator-Main.png',
        modalKey: 'generic'
    },
    {
        id: 5,
        title: 'Process of Elimination',
        description: 'Created roguelike game using C++ and UNT\'s Larc engine (helper engine wrapped around DirectX)'
            + '\n\nDeveloped procedural dungeon generation and object oriented enemy AI creator',
        skills: [
            'DirectX',
            'Procedural generation',
            'OOP design',
            'C++'
        ],
        year: 2024,
        section: 'school-projects',
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
        title: 'Monster Masked',
        context: 'Global Game Jam 2026',
        description: 'Only let the correct monsters into the party',
        skills: [
            'Godot',
            'Reusable Resources',
        ],
        year: 2026,
        section: 'game-jam',
        image: '/assets/Games/GameJamGames/MonsterMasked/Monster-Masked-Main.png',
        screenshots: [
            '/assets/Games/GameJamGames/MonsterMasked/Monster-Masked-Main.png',
            '/assets/Games/GameJamGames/MonsterMasked/MonsterMasked/index.png',
        ],
        iframeUrl: '/assets/Games/GameJamGames/MonsterMasked/MonsterMasked/index.html',
        modalKey: 'game-jam'
    },
    {
        id: 7,
        title: 'Barbarian Beats',
        context: 'Final Croak Jam 2026',
        description: 'Slash monsters to the beat of a song, getting upgrades and throwing weapons.',
        skills: [
            'Unity',
            'Scriptable objects',
            'C#'
        ],
        year: 2026,
        section: 'game-jam',
        image: '/assets/Games/GameJamGames/BarbarianBeats/Barbarian-Beats-Main.png',
        modalKey: 'generic'
    },
    {
        id: 8,
        title: 'The Graveyard Drift',
        context: 'GMTK Game Jam 2025',
        description: 'Close in ghosts with loops to capture them and use their ectoplasm to fuel your motorcycle.',
        skills: [
            'Godot',
            'Game design',
        ],
        year: 2025,
        section: 'game-jam',
        image: '/assets/Games/GameJamGames/GraveyardDrift/GraveyardDrift-Main.png',
        screenshots: [
            '/assets/Games/GameJamGames/GraveyardDrift/GraveyardDrift-Main.png',
            '/assets/Games/GameJamGames/GraveyardDrift/TheGraveyardDrift/index.png',
        ],
        iframeUrl: '/assets/Games/GameJamGames/GraveyardDrift/TheGraveyardDrift/index.html',
        modalKey: 'game-jam'
    },
    {
        id: 9,
        title: 'Demon Punter',
        context: 'Global Game Jam 2025',
        description: 'Save your fairy village by knocking invading demons into spikes using your bubble wand.',
        skills: [
            'Godot',
            'Physics',
            'Game design',
        ],
        year: 2025,
        section: 'game-jam',
        image: '/assets/Games/GameJamGames/DemonPunter/DemonPunter-Main.png',
        screenshots: [
            '/assets/Games/GameJamGames/DemonPunter/DemonPunter-Main.png',
            '/assets/Games/GameJamGames/DemonPunter/DemonPunterWeb/index.png',
        ],
        iframeUrl: '/assets/Games/GameJamGames/DemonPunter/DemonPunterWeb/index.html',
        modalKey: 'game-jam'
    },
];