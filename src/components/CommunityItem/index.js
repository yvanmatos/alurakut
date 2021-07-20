export default function CommunityItem({ name, img_url, id, slug }) {
    return (
      <li key={id}>
        <a href={`/comunidades/${id}`}>
          <img src={img_url} alt={name} />
          <span>{name}</span>
        </a>
      </li>
    );
  }

  