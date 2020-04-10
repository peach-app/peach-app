module.exports = async (root, { id }, { client, q, DocumentDataWithId }) => {
  console.log('YEYEYEYEYE', id);

  const p = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('campaign_by_user'), id)),
      q.Lambda('ref', DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );

  console.log('P', p);

  return true;
};
