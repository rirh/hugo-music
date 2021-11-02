import * as IPFS from 'ipfs-core'
const ipfs = await IPFS.create()
const { cid } = await ipfs.add('Hello world')
console.info(cid)
