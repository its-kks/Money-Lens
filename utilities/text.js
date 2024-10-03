
function limitText( text, maxSize ) {
  if ( text.length > maxSize ) {
    return text.substring(0, maxSize-3) + '...';
  }
  return text;
}

export { limitText };