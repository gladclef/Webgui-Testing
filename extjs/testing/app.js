Ext.application({
  name     : 'MyApp',
  requires : ['MyApp.view.main.MyPanel'],

  launch   : function() {

    Ext.create('MyApp.view.main.MyPanel', {
      renderTo : Ext.getBody(),
      title    : 'My First Panel',
      html     : 'My First Panel'
    });

  }
});