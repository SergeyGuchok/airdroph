import { CronJob } from 'cron';
import { Account } from '../../controllers/Account/index.js';

const state = {
  controllers: [],
  leftControllers: [],
  currentControllers: [],
  counter: 0,
}

const toAdd = []

const toRemove = []

const pacmoon = ['pasteltonesss','chadmongman', 'pacvalidatorv2', 'iamashchild', '0xcrabb', 'g_waap', 'ubutoo', 'happyjoenft', 'pacmoon_', 'dannygreene', '0xmk021', 'pacnub', 'themistergoat', 'gojo0x', 'fattyrgarita',
  'apex_cryptoeth', 'ztvlfuyem71zjts', 'cschua09', 'ariesyuangga', 'juicyjama_', 'ab2tract', 'dialindoe', 'digger_nft', 'scooter_420', '0xrumrunner', 'damotniulap', 'g_waap', 'mauricioostos', 'travelfunones', '0xcrabb', 'airongrid1', 'anikijungle', 'nefretiriii', 'widzeth', 'juicyhamdogs', 'percytonie', 'niccinft', 'noahsnftark', 'rizethereum', 'lecrepiste', 'pkudiwal', 'lecrepiste', 'craysecurity', 'stuebi18', 'happyjoenft', 'fabxgow', 'cryptoleon_eth', 'sasha_nft', 'ikahq_', 'sof1azara03', 'hairdropcat', '7316', 'degenty_dev', 'iliketabz', 'daviswals1', 'alexandre_nft7', 'btclover23', 'osf_rekt', 'redpandaluu', 'jaylow999', 'berndawgler', 'tyler_did_it', 'KajWedemeijer', 'JoeLeMerou', 'rekt2160', 'theog_general',
  'sweazycrypto', 'nftsiti', 'sskwirtel', 'dynamicisreal', 'annafiweb3', 'queenhinanoor1', 'nezuki_nft', 'jlassec', 'rufyeth', 'erenyeager_eth', 'miami_eth', 'mariannenfts', 'scoopysnax', 'brefchuila',
]

const cherry = ['onepiecedaiIys', 'Bitheartbit', 'KakoiVostorg', 'taszix_x', 'felchou_eth', '0xMikachu', 'ThomasGrig', 'Davidenj1', 'ScotM56557', 'fun_sorare_fun', 'AndoBits', '0xCragHack', 'BuyOnTheDip_', 'reedin__eth', 'beast_ico', 'Biel', 'xannyain10', 'cryptofunnn', 'qbykyr813k93543', 'TerFranck', 'Nem_Byte', 'Blastobast', 'adamagb', 'kt_824', 'omidrznft', 'cryptovuive', 'Hallalluja', 'Lecryptocien', 'ReineCalypso', 'rufyeth', 'GoldenBlasted', '0xAzurezren', 'PokerBuddy123', 'Cryptokid45', 'kattasttroffa', 'easyforshopping', 'FungibleTokn', 'Jadedsun1', 'TammyWilli17905', 'ihascorndog', 'Bull_Biz_Art', 'Pashus07', 'jobsandnft', '_CaptainNFT', 'MehmetAkiff10', 'abdou80006673', 'deborrow528', 'yy8829958286440', 'SethA1982', 'JerryJonesIlI', 'BenjiJouv', 'gatbowlbut73679', 'the_underdoggg', '0xBotwin', 'EmperorButters', 'tyh668', 'BRC20watch', 'BlakeCher34292', 'notbashnu', 'nftstrategist12', 'Ligh7ss', 'newdar777', 'ASimamfa', 'nguyend23092411', 'business_cycle_', '0x947sh', '0x_zeitoun', 'ENSlag', 'SkayzNft', 'gobigrad', 'Cyber_Warriorr', 'CryptoEmpereur', 'twotoneDCL', 'ZonnyV3', '0xgigger', 'AdenJax2012', 'AshWebster21', 'Kushylingus', '_sagepo_', 'huan_zhi1998', 'CesarLopes72', 'KingRagnarlth', 'DempseyWeb3', 'TipsterBarton', 'hemvall', '0xGoofy', 'Naytiz_', 'tntnftclub', 'tong_phai', '0xCHASS', 'cryptochoudai', 'DareIsabel69212', 'Humbly03665969', 'tharoo112233', 'CryptoLigght', 'Srgent1', 'lululongway', 'pn668769', 'MaksikYakovlev', 'ismettpeja']

// const uniqueArray = Array.from(new Set(array));

const change = () => {
  if (!state.leftControllers.length) {
    accountCronJob.stop()
    console.log('stopped')
  }

  state.currentControllers = [...state.leftControllers.slice(0, 5)]
  state.leftControllers = [...state.leftControllers.slice(5)]
  state.counter = state.counter + 1

  console.log(state.counter)
}

const accountCronJob = new CronJob('*/20 * * * *', async () => {
  for (const controller of state.currentControllers) {
    const { isInitialized } = controller.getState()

    if (isInitialized) {
      await controller.scalpTweetsAndReply()
    } else {
      await controller.initiate()
      await controller.scalpTweetsAndReply()
    }

    await new Promise(resolve => setTimeout(resolve, 10000));
  }

  change()
})

export const initialize = async () => {
  const initialControllers = cherry.map(username => new Account({ username }));

  state.controllers = initialControllers
  state.leftControllers = [...initialControllers.slice(5)]
  state.currentControllers = [...initialControllers.slice(0,5)]

  accountCronJob.start()
}