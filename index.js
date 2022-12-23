const ethers = require("ethers")
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')

const doHash = (address) => {
    return Buffer.from(ethers.utils.solidityKeccak256(['address'], [address]).slice(2), 'hex')
}

const AL = require("./allowlist")

// Important thing: solidityKeccak256 is case-insensitive for addresses.
const AL_MERKLE_TREE = new MerkleTree(AL.map(address => doHash(address)), keccak256, { sortPairs: true })

// For faster lookups
const AL_LOOKUP = new Map(AL.map(v => [v, true]))

console.log("Merkle root is:", AL_MERKLE_TREE.getHexRoot())

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.merkleTreeProofGenerator = (req, res) => {
    const requestingAddress = req.query.address.toLowerCase()
    res.header('Content-Type', 'application/json')
    if (!AL_LOOKUP.has(requestingAddress)) {
        res.status(404)
            .send({status: "error", error: `${requestingAddress} is not in the allowlist`})
        return
    }
    const proof = AL_MERKLE_TREE.getHexProof(doHash(requestingAddress))
    res.status(200).send({status: "success", proof})
}
  
