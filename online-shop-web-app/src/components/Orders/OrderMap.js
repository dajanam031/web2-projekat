import Home from "../Users/Home";
import "leaflet/dist/leaflet.css";
import { AcceptOrder, GetOrdersOnMap } from "../../services/OrderService";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "leaflet";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

function OrderMap() {
  const [markers, setMarkers] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const geocodeAddresses = async () => {
      const orders = await GetOrdersOnMap();
      orders.forEach(async (order) => {
        try {
          const response = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            {
              params: {
                address: order.deliveryAddress,
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              },
            }
          );

          const { results } = response.data;
          if (results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            setMarkers((prevMarkers) => [
              ...prevMarkers,
              { lat, lng, orderDetails: order },
            ]);
          }
        } catch (error) {
          console.log(error);
        }
      });
    };

    geocodeAddresses();
  }, []);

  const customIcon = new Icon({
    iconUrl: process.env.PUBLIC_URL + "/location.png",
    iconSize: [38, 38],
  });

  const handleMarkerClick = (orderDetails) => {
    setSelectedOrder(orderDetails);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const acceptOrder = async (orderId) => {
    try{
        await AcceptOrder(orderId);
        setMarkers((prevMarkers) =>
        prevMarkers.filter((marker) => marker.orderDetails.id !== orderId)
      );
        setDialogOpen(false);
    }catch(error){
        console.log('Error occured while trying to accept order.');
    }
  };

  return (
    <>
      <Home />
      <MapContainer center={[44.8125, 20.4612]} zoom={7}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker, index) => (
          <Marker
            icon={customIcon}
            position={[marker.lat, marker.lng]}
            key={index}
            eventHandlers={{
              click: () => handleMarkerClick(marker.orderDetails),
            }}
          >
            <Popup>
              <p>{marker.orderDetails.deliveryAddress}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedOrder && (
        <Dialog open={dialogOpen} onClose={closeDialog}>
          <DialogTitle>Selected Order Details</DialogTitle>
          <DialogContent>
            <p>Comment: {selectedOrder.comment}</p>
            <p>Total price: {selectedOrder.totalPrice}</p>
            <p>Payment type: {selectedOrder.paymentType}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => acceptOrder(selectedOrder.id)} color='secondary'>Accept order</Button>
            <Button onClick={closeDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default OrderMap;
