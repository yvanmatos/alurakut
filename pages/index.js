import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.gitHubUser}.png`} style={{ borderRadius: '8px'}}/>
    </Box>
  )
}

export default function Home() {

  const gitHubUser = "yvanmatos"
  const pessoasFavoritas = [
    'juunegreiros', 
    'peas', 
    'omariosouto', 
    'rafaballerini', 
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar gitHubUser={gitHubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet fas={1} confiavel={3} legal={3} sexy={1} />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((gitHubUser) => {
                return (
                  <li>
                    <a href={`/users/${gitHubUser}`} key={gitHubUser}>
                      <img src={`https://github.com/${gitHubUser}.png`} />
                      <span>{gitHubUser}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
