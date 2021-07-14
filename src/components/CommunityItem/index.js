export default function CommunityItem({ name, img_url, id }) {
    return (
      <li key={id}>
        <a href={img_url}>
          <img src={img_url} alt={name} />
          <span>{name}</span>
        </a>
      </li>
    );
  }