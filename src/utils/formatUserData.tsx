export const formatUserData = (profileData: any, artists: any[], albums: any[], tracks: any[]) => {

  const imageUrl = profileData.user.image && Array.isArray(profileData.user.image) 
    ? profileData.user.image.find((img: any) => img.size === 'extralarge')?.['#text'] 
    : undefined;

  const profileSummary = `
      Nome do usuário: ${profileData.user.name}
      Nome real: ${profileData.user.realname}
      Total de scrobbles: ${profileData.user.playcount}
      Número de álbuns: ${profileData.user.album_count}
      Número de artistas: ${profileData.user.artist_count}
    `;
  
    const topArtistsSummary = artists
      .map((artist: any, index: number) => `${index + 1}. ${artist.name} - ${artist.playcount} scrobbles`)
      .join('\n'); 
  
    const topAlbumsSummary = albums
      .map((album: any, index: number) => `${index + 1}. ${album.name} (Artista: ${album.artist.name}) - ${album.playcount} scrobbles`)
      .join('\n'); 
  
    const topTracksSummary = tracks
      .map((track: any, index: number) => `${index + 1}. ${track.name} (Artista: ${track.artist.name}) - ${track.playcount} scrobbles`)
      .join('\n'); 
  
  return {
    imageUrl,  // <- retorna a URL separada
    summary: `
      Avatar:
      ${imageUrl}

      Perfil do usuário:
      ${profileSummary}
      
      Artistas:
      ${topArtistsSummary}
  
      Álbuns:
      ${topAlbumsSummary}
  
      Faixas:
      ${topTracksSummary}
    `
  };
}