import CryptoJS from 'crypto-js';

export function gravatarUrl(email : string) {
  const hash = CryptoJS.MD5(email.trim().toLowerCase()).toString()
  return `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon&r=pg`
}
