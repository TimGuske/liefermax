import { Table, CloseButton, Button, Card } from 'react-bootstrap';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { loescheProdukt, leeren } from '../redux/warenkorbSlice';
import axios from 'axios';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';


export default function Warenkorb() {
  const dispatch = useDispatch()
  const warenkorb = useSelector((state) => state.warenkorb)
  const router = useRouter();

  const entfernen = (produkt) => {
    dispatch(loescheProdukt(produkt));
    toast.error(`${produkt.name} wurde aus dem Warenkorb entfernt`, {
      position: 'top-center',
      autoClose: 3000,
    });
  }

  const erstelleBestellung = async (data) => {
    try {
      const res = await axios.post("/api/bestellungen", data);

      console.log("Data:", data);
      console.log(res);

      if (res.status === 201) {
        console.log("Res OK!");
        dispatch(leeren());
        router.push(`/bestellungen/${res.data._id}`);
      }

    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <motion.div initial={{ y: -300 }} animate={{ y: 0 }} transition={{type: 'spring', stiffness: 120}}>
      {warenkorb.wAnzahl === 0 ? (
        <h2>Der Warenkorb ist leer!</h2>
      ) : (

        <div>
          <h1>Warenkorb</h1>
          <div>
            <div>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Bild</th>
                    <th>Name</th>
                    <th>Extras</th>
                    <th>Menge</th>
                    <th>Betrag</th>
                    <th><CloseButton disabled /></th>
                  </tr>
                </thead>
                <tbody>
                  {warenkorb.produkte.map((produkt) => (
                    <tr key={produkt._id}>
                      <td>
                        <Image src={produkt.bild} alt={produkt.name} width={50} height={50} />
                      </td>
                      <td>
                        <Link href={`/produkte/${produkt.url}`}>
                          {produkt.name}
                        </Link>
                      </td>
                      <td>
                        {produkt.extras.map(extra => (
                          <span key={extra._id}>{extra.text} </span>
                        ))}
                      </td>
                      <td>{produkt.menge}</td>
                      <td>{(produkt.preis * produkt.menge).toFixed(2)}</td>
                      <td><Button className='btn-sm' onClick={() => entfernen(produkt)}>x</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div>
              <div className='shadow'>
                <Card>
                  <Card.Header as="h5">Gesamt</Card.Header>
                  <Card.Body className='text-center'>
                    <Card.Title>
                      {warenkorb.gesamtbetrag.toFixed(2)} Euro
                    </Card.Title>
                    <Button variant='primary' onClick={() => {

                      const bestellung = {
                        kunde: "Tim",
                        adresse: "DingsBumsStrasse 8, 71364 Winnenden",
                        betrag: warenkorb.gesamtbetrag,
                        status: 0,
                        zahlung: 1,
                        produkte: warenkorb.produkte.map((produkt) => (
                          {
                            name: produkt.name, menge: produkt.menge, extras:
                              produkt.extras.map(extra => (extra.text))
                          }
                        )),
                      };

                      erstelleBestellung(bestellung);

                    }}>Zur Kasse</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
                      
        </div>
      )}
    </motion.div>
  )
}
