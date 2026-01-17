import { Router } from "express";

const router = Router();


const eventData = [
    {id: 1, location: "New Orleans", name: "Birthday Party", date: "01/20/2026"},
    {id: 2, location: "Memphis", name: "Wedding", date: "01/20/2026"},
    {id: 3, location: "Memphis", name: "Groundhog Day Party", date: "01/20/2026"},
]

// events
router.get("/", (req, res) => {
    res.json(eventData);
});

// example /events/2

router.get("/:id", (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    console.log(eventId)
    console.log();
    let temp = null;
    for(let i=0; i<eventData.length; i++){
        console.log(eventData[i]);
        if(eventId === eventData[i].id) {
            temp = eventData[i];
        }
    }
    res.json(temp);
});

export default router;
