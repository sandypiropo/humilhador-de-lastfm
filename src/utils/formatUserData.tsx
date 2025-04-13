export const formatUserData = (profileData: any, artists: any[], albums: any[], tracks: any[]) => {
    const profileSummary = `
      Nome do usuário: ${profileData.user.name}
      Nome real: ${profileData.user.realname}
      Total de plays: ${profileData.user.playcount}
      Número de álbuns: ${profileData.user.album_count}
      Número de artistas: ${profileData.user.artist_count}
    `;
  
    const topArtistsSummary = artists
      .map((artist: any, index: number) => `${index + 1}. ${artist.name} - ${artist.playcount} plays`)
      .join('\n'); 
  
    const topAlbumsSummary = albums
      .map((album: any, index: number) => `${index + 1}. ${album.name} (Artista: ${album.artist.name}) - ${album.playcount} plays`)
      .join('\n'); 
  
    const topTracksSummary = tracks
      .map((track: any, index: number) => `${index + 1}. ${track.name} (Artista: ${track.artist.name}) - ${track.playcount} plays`)
      .join('\n'); 
  
    return `
      Perfil do usuário:
      ${profileSummary}
      
      Artistas:
      ${topArtistsSummary}
  
      Álbuns:
      ${topAlbumsSummary}
  
      Faixas:
      ${topTracksSummary}
    `;
  };
  