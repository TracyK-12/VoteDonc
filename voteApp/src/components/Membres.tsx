import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonButton } from '@ionic/react';

interface Member {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  has_voted: number;
}

const Membres: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/members')
      .then((res) => res.json())
      .then((data) => setMembers(data.data))
      .catch((err) => console.error('Erreur chargement membres:', err));
  }, []);

  const voter = (id: number) => {
    fetch(`http://localhost:3000/api/v1/members/${id}/vote`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then(() => {
        setMembers((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, has_voted: 1 } : m
          )
        );
      })
      .catch((err) => console.error('Erreur vote:', err));
  };

  return (
    <IonList>
      {members.map((membre) => (
        <IonItem key={membre.id}>
          <IonLabel className="ion-text-wrap">
            <h2>{membre.first_name} {membre.last_name}</h2>
            <p>Date de naissance : {membre.birth_date}</p>
          </IonLabel>
          {membre.has_voted ? (
            <IonLabel color="success">✅ A voté</IonLabel>
          ) : (
            <IonButton color="primary" onClick={() => voter(membre.id)}>
              Voter
            </IonButton>
          )}
        </IonItem>
      ))}
    </IonList>
  );
};

export default Membres;
