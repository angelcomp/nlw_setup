import { useState } from 'react'
import logoImage from '../assets/logo.svg'
import { NewHabitDialog } from './NewHabitDialog'

export function Header() {

  return (
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
        <img src={logoImage} alt="Habits logo" />

        <NewHabitDialog />
      </div>
  )
}