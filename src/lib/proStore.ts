// src/lib/proStore.ts

const proUsers = new Map<string, boolean>()

export function setPro(extensionId: string, value: boolean) {
  proUsers.set(extensionId, value)
}

export function isPro(extensionId: string): boolean {
  return proUsers.get(extensionId) === true
}
