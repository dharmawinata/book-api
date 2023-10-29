//memilih create read delete update

const Book = require("../models/book.model.js")

exports.create = async (req,res) => {
    try {
        const {title,author,summary,publisher} = req.body;
        const book = await Book.create({
            title,
            author,
            summary,
            publisher
        });

        return res.status(201).json({
            status : 201,
            success : true,
            message : "new book created",
            data : {
                book : book,
            },
            erorr : null
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status : 500,
            success : false,
            message : "Internal server error",
            data : null,
            erorr : error
        });
    }
}

exports.all = async (req,res) => {
    try {
        const books = await Book.findAll();
        return res.status(200).json({
            status : 200,
            success : true,
            message : "ok ok  aja",
            data : {
                book : books,
            },
            erorr : null
        }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status : 500,
            success : false,
            message : "Internal server error",
            data : null,
            erorr : error
        });
    }
}

exports.find = async (req,res) => {
    try {
        const {id} = req.params;
        const book = await Book.findOne({
            where : {
                id : id
            }
        });

        if (!book) {
            return res.status(404).json({
                status : 404,
                success : false,
                message : "Book not found",
                data : null,
                erorr : "data tidak ada"
            }); 
        }

        return res.status(200).json({
            status : 200,
            success : true,
            message : "ok ok  aja",
            data : {
                book : book,
            },
            erorr : null
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status : 500,
            success : false,
            message : "Internal server error",
            data : null,
            erorr : error
        });
    }
}

exports.update = async (req,res) => {
    try {
        const {id} = req.params;
        const updated = await Book.update(req.body, {
            where : {
                id : id
            }
        });

        if (!updated[0]) {
            return res.status(400).json({
                status : 400,
                success : false,
                message : "gagal update",
                erorr : "gagal update"
            });
        }

        const book = await Book.findOne({
            where : {
                id : id
            }
        });
        return res.status(200).json({
            status : 200,
            success : true,
            message : "berhasil update",
            data : {
                book : book,
            },
            erorr : null
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status : 500,
            success : false,
            message : "Internal server error",
            data : null,
            erorr : error
        });
    }
}

exports.destroy = async (req,res) => {
    try {
        const {id} = req.params;
        const destroyed = await Book.destroy({
            where : {
                id : id
            }
        });

        if (!destroyed) {
            return res.status(400).json({
                status : 400,
                success : false,
                message : "gagal delete",
                erorr : "gagal delete"
            });
        }
        return res.status(200).json({
            status : 200,
            success : true,
            message : "berhasil deleted",
            data : null,
            erorr : null
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status : 500,
            success : false,
            message : "Internal server error",
            data : null,
            erorr : error
        });
    }
} 