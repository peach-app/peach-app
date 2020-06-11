module.exports = async (
  { id, format },
  { options = 'w_200,h_200,c_fill,g_auto' }
) => {
  return `https://res.cloudinary.com/peach-app/image/upload/${options}/${id}.${format}`;
};
