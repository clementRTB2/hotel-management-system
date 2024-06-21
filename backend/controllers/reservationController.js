const Reservation = require('../models/Reservation');

// Create a new reservation
const createReservation = async (req, res) => {
  const isRoomAvailable = await checkRoomAvailability(
    req.body.room,
    req.body.checkIn,
    req.body.checkOut,
  )
  if(!isRoomAvailable) {
    return res.status(400).json({ message: "La chambre n'est pas disponible pour ces dates." });
  }
  try {
    const reservation = new Reservation({
      ...req.body,
      user: req.user._id
    });
    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific reservation by ID
const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('user');
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a reservation by ID
const updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReservation) return res.status(404).json({ message: 'Reservation not found' });
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a reservation by ID
const deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) return res.status(404).json({ message: 'Reservation not found' });
    res.status(200).json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const checkRoomAvailability = async (roomId, checkIn, checkOut) => {
  // Vérifier s'il existe une réservation qui chevauche les dates données
  const existingReservation = await Reservation.findOne({
    room: roomId,
    $or: [
      { checkIn: { $lte: checkOut }, checkOut: { $gte: checkIn } }, // Nouvelle réservation commence pendant une réservation existante
      { checkIn: { $gte: checkIn, $lte: checkOut } }, // Nouvelle réservation commence avant la fin d'une réservation existante
      { checkOut: { $gt: checkIn, $lte: checkOut } } // Nouvelle réservation finit après le début d'une réservation existante
    ]
  });

  return !existingReservation; // True si aucune réservation n'est trouvée qui chevauche les dates
}

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
};
