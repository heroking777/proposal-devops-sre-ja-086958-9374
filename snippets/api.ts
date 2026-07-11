import express from 'express';
import { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface Vehicle {
  id: string;
  driverId: string;
  status: 'available' | 'in-use' | 'maintenance';
}

const vehicles: Vehicle[] = [];

// Endpoint to get all vehicles
app.get('/vehicles', (req: Request, res: Response) => {
  res.json(vehicles);
});

// Endpoint to add a new vehicle
app.post('/vehicles', (req: Request, res: Response) => {
  const { id, driverId, status } = req.body;
  if (!id || !driverId || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  vehicles.push({ id, driverId, status });
  res.status(201).json({ message: 'Vehicle added successfully' });
});

// Endpoint to update a vehicle's status
app.put('/vehicles/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const vehicleIndex = vehicles.findIndex(v => v.id === id);
  if (vehicleIndex === -1) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  vehicles[vehicleIndex].status = status;
  res.json({ message: 'Vehicle status updated successfully' });
});

// Endpoint to delete a vehicle
app.delete('/vehicles/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const vehicleIndex = vehicles.findIndex(v => v.id === id);
  if (vehicleIndex === -1) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  vehicles.splice(vehicleIndex, 1);
  res.json({ message: 'Vehicle deleted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});