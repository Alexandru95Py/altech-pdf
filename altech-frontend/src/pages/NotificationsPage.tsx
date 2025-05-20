

const NotificationsPage = () => {
  const notifications = [
    { id: 1, message: 'Fișierul tău a fost procesat cu succes.', read: false },
    { id: 2, message: 'Ai o actualizare disponibilă pentru cont.', read: true },
    { id: 3, message: 'Cererea ta de suport a primit răspuns.', read: false },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Notificări</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notifications.map((notif) => (
          <li
            key={notif.id}
            style={{
              backgroundColor: notif.read ? '#f4f4f4' : '#e0f7fa',
              marginBottom: '1rem',
              padding: '1rem',
              borderRadius: '5px',
            }}
          >
            {notif.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;