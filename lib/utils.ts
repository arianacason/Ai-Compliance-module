import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getProgress(): {
  completedModules: string[]
  currentModule: string | null
  overallProgress: number
} {
  if (typeof window === 'undefined') {
    return { completedModules: [], currentModule: null, overallProgress: 0 }
  }
  
  const completed = JSON.parse(localStorage.getItem('completedModules') || '[]')
  const current = localStorage.getItem('currentModule')
  const progress = (completed.length / 7) * 100
  
  return {
    completedModules: completed,
    currentModule: current,
    overallProgress: Math.round(progress)
  }
}

export function markModuleComplete(moduleId: string) {
  if (typeof window === 'undefined') return
  
  const completed = JSON.parse(localStorage.getItem('completedModules') || '[]')
  if (!completed.includes(moduleId)) {
    completed.push(moduleId)
    localStorage.setItem('completedModules', JSON.stringify(completed))
  }
}

export function setCurrentModule(moduleId: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem('currentModule', moduleId)
}

export function resetProgress() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('completedModules')
  localStorage.removeItem('currentModule')
  localStorage.removeItem('userChoices')
}

export function saveChoice(moduleId: string, choiceId: string, choice: any) {
  if (typeof window === 'undefined') return
  
  const choices = JSON.parse(localStorage.getItem('userChoices') || '{}')
  if (!choices[moduleId]) {
    choices[moduleId] = {}
  }
  choices[moduleId][choiceId] = choice
  localStorage.setItem('userChoices', JSON.stringify(choices))
}

export function getChoices(moduleId: string) {
  if (typeof window === 'undefined') return {}
  
  const choices = JSON.parse(localStorage.getItem('userChoices') || '{}')
  return choices[moduleId] || {}
}