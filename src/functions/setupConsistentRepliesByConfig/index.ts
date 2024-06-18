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

const cherry = ['onepiecedaiIys', 'from_armani', '0xAnP', 'jessee40769652', 'Layer2hunters', 'SUBHENDUDEB20', 'Nguyenlinh6688', 'farhadirkh55650', 'ismettpeja', 'ThomasCran39518', 'Bitheartbit', 'MonsterFishNFT', 'Radaasne', 'Blastobast', '0xMikachu', 'KakoiVostorg', 'Valik1345076', 'x0kir0', 'wantobevoice', 'nggcaoson', 'felchou_eth', 'TaDinhNhat1', 'SeagersCrypto', 'NobelCn73902', 'cryptovuive', 'SkayzNft', 'Lecryptocien', 'ThomasGrig', 'aGANVogh', 'Snea_kr', 'fun_sorare_fun', 'taszix_x', 'wwwken9', 'DempseyWeb3', 'ReineCalypso', 'CanavaroXYZ', 'CRauer5902', 'hemvall', 'Jadedsun1', 'NewStalgic61044', 'Naytiz_', 'ScotM56557', '0xCragHack', 'CryptoEmpereur', 'xSkunkx78', 'Tomyy_sol', 'AndoBits', 'Biel', 'EthSanchi62008', '_CaptainNFT', 'TerFranck', 'twotoneDCL', 'Gauss335701', 'MatthewPar25425', 'BenjiJouv', 'iamsunny_nft', 'AdenJax2012', 'reedin__eth', 'EriqueF1', 'mobguy_anon', 'PokerBuddy123', 'BRC20watch', 'ngankimzz', 'barbaramar32883', 'JudFlrs', 'jobsandnft', 'LeButineur_Off', 'Yun_Fr', 'cryptofunnn', 'ooonays', 'ericpacmoon', 'BrakowShelby', 'Nem_Byte', '0xGoofy', 'TSlick26', 'trenerov', 'alexiiiis213', 'BuyOnTheDip_', 'beast_ico', 'reachgraal', 'kt_824', 'JerryJonesIlI', 'TienLeMars', 'Cryptotx7', 'barukomar4', 'FungibleTokn', 'ENSlag', 'xannyain10', 'JackDu92787289', 'fvckthediablo', 'NguyenVu311', 'huan_zhi1998', 'Kiaa_eth', 'adamagb', '0xCHASS', 'kattasttroffa', 'lordless_io', 'Number______01', 'Bull_Biz_Art', 'BeckieGoldie'].reverse()

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