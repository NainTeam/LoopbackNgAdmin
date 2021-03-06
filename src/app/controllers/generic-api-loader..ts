export interface GenericApiLoaderConfig{
  page:Number;
  limit:Number;
}

export interface GenericApiLoader {
  loaderConfig:GenericApiLoaderConfig;
  
  loadData();
  nextPage();
  prevPage();
}
