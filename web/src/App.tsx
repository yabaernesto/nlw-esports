import { useEffect, useState } from 'react'
import logoImg from './assets/logo-nlw-esports.svg'
import { GameBanner } from "./components/GameBanner"
import { CreateAdBanner } from "./components/CreateAdBanner"

import './index.css'
import { CreateAtModal } from './components/CreatAtModal'

import * as Dialog from '@radix-ui/react-dialog'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

export function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className="mx-w-[1344px] mx-auto flex flex-col items-center my-6">
      <img src={logoImg} alt="logo" />
      <h1 className="text-6xl text-white font-black mt-3">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">Duo</span> esta aqui.
      </h1>

      <div className="grid grid-cols-6 gap-4 mt-3">
        {games.map(game => {
          return (
            <GameBanner 
              key={game.id} 
              bannerUrl={game.bannerUrl} 
              title={game.title} 
              adsCount={game._count.ads} 
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAtModal />
      </Dialog.Root>
    </div>
  );
}
