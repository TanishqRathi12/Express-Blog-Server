const {Router} = require("express")

const authorRouter = Router();

const {
    createAuthor,
    readAllAuthor,
    authorById,
    updateAuthor,
    patchAuthor,
} = require("../handlers/author");

authorRouter.post("",createAuthor); 

authorRouter.get("",readAllAuthor);

authorRouter.get("/:authorId",authorById);

authorRouter.put("/:authorId",updateAuthor);

authorRouter.patch("/:authorId",patchAuthor)

module.exports = {authorRouter};