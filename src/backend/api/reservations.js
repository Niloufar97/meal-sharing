import express from "express"
import knex from "../database.js"
import joi from "joi"
const router = express.Router();

const reservationSchema = joi.object({
    number_of_guests: joi.number().required(),
    meal_id: joi.number().required() ,
    created_date: joi.date().iso().required(),
    contact_phonenumber : joi.string().min(8),
    contact_name: joi.string().required(),
    contact_email : joi.string().email(),
})

// Returns all reservations
router.get("/", async (req, res) => {
  try {
    const allReservations = await knex("Reservation").select();
    res.status(200).json({ data: allReservations, message: "ok" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Adds a new reservation to the database
router.post("/", async(req, res) => {
  try {
    const {error} = reservationSchema.validate(req.body, {abortEarly: false});
    if(error){
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({error : errorMessages})
    }

    await knex("Reservation").insert(req.body);

    res.status(201).json({message : "Reservation added successfully"})
  }catch (error){
    return res.status(500).json({ message: "Internal server error" });
  }
});
// Returns a reservation by id
router.get("/:id" , async(req, res) => {
    try{
        const reservationId = +req.params.id;
        const reservation = await knex("Reservation").where("reservation_id", "=", reservationId).select();
        if(reservation.length === 0){
            return res.status(404).json({message: "Reservation not found"})
        }
        res.status(200).json({data: reservation , message :"ok"})
    }catch (error){
        return res.status(500).json({ message: "Internal server error" });
    };
});

// 	Updates the reservation by id
router.put("/:id" , async(req, res) =>{
    try{
        const reservationId = +req.params.id;
        const {error} = reservationSchema.validate(req.body , {abortEarly : false});
        if(error){
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({errors : errorMessages})
        }

        const updatedReservation = await knex("Reservation").where("reservation_id" , "=" , reservationId).update(req.body)
        if(!updatedReservation){
            return res.status(404).json({message: " Can not find reservation with this id "})
        }
        res.status(200).json({message: "Reservation updated successfully"});

    }catch (error){
        return res.status(500).json({ message: "Internal server error" });
    };
});

// Deletes the reservation by id
router.delete("/:id" , async(req, res) => {
    try{
        const reservationId = +req.params.id;
       const deletedReservation = await knex("Reservation").where("reservation_id" , "=" , reservationId).del();
       if(!deletedReservation){
        return res.status(404).json({message: " Can not find reservation with this id "})
       };
       res.status(200).json({message : "Reservation deleted successfully"})
    }catch (error){
        return res.status(500).json({ message: "Internal server error" });
    };   
});

export default router;
