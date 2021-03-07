import { CreatePlayerComponent } from './components/create-player/create-player.component';
import { TablesBoardComponent } from './components/tables-board/tables-board.component';
import { TableComponent } from './components/table/table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartMenuComponent } from './components/start-menu/start-menu.component';

const routes: Routes = [
    { path: '', component: CreatePlayerComponent },
    { path: 'menu', component: StartMenuComponent },
    { path: 'table/:id', component: TableComponent },
    { path: 'tables', component: TablesBoardComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
