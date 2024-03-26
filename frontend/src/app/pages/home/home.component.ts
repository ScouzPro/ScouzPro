import { Component, OnInit } from "@angular/core";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterLink } from "@angular/router";
import { VideosComponent } from "../../components/videos/videos.component";
import { PlayerServiceService } from "../../service/player-service.service";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink,
    VideosComponent,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
})
export class HomeComponent implements OnInit {
  allPlayersHome: any[] = [];
  filteredPlayers: any[] = [];
  pagedPlayers: any[] = [];
  fechaSeguimiento: string = "2024-03-20";
  p: number = 1;
  pageSize: number = 4;

  constructor(private playerService: PlayerServiceService) {}

  ngOnInit(): void {
    this.setupCarousel();
    this.loadAllPlayersHome();
  }

  setupCarousel(): void {
    const items = document.querySelectorAll(".carousel-item");
    items.forEach((item) => {
      item.classList.add("hidden");
    });
    items[0].classList.remove("hidden");
  }

  async loadAllPlayersHome() {
    try {
      this.allPlayersHome = await this.playerService.getPlayerFollowed();
      this.filteredPlayers = this.allPlayersHome;
      console.log(this.filteredPlayers);
      this.setPagedPlayers();
    } catch (error) {
      console.error("Error loading players followed:", error);
    }
  }

  setPagedPlayers(): void {
    const startIndex = (this.p - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedPlayers = this.filteredPlayers.slice(startIndex, endIndex);
  }

  // onPageChange(pageNumber: number): void {
  //   if (pageNumber >= 1 && pageNumber <= this.getMaxPageNumber()) {
  //     this.p = pageNumber;
  //     this.setPagedPlayers();
  //   }
  // }

  onPageChange(pageNumber: number): void {
    this.p = pageNumber;
    this.setPagedPlayers(); // Actualizar las tarjetas de jugador
  }
  
  getMaxPageNumber(): number {
    return Math.ceil(this.filteredPlayers.length / this.pageSize);
  }

  seguir(): void {
    console.log("Siguiendo al jugador...");
  }

  moveCarousel(direction: number): void {
    console.log('Direction:', direction);
    const carouselItems = document.querySelectorAll(".carousel-item");
    let currentIndex = -1;
  
    carouselItems.forEach((item, index) => {
      if (!item.classList.contains("hidden")) {
        currentIndex = index;
      }
    });
  
    console.log('Current Index:', currentIndex);
  
    if (currentIndex !== -1) {
      carouselItems[currentIndex].classList.add("hidden");
      let nextIndex = currentIndex + direction;
  
      console.log('Next Index:', nextIndex);
  
      if (nextIndex < 0) {
        nextIndex = carouselItems.length - 1;
      } else if (nextIndex >= carouselItems.length) {
        nextIndex = 0;
      }
  
      console.log('Updated Next Index:', nextIndex);
  
      carouselItems[nextIndex].classList.remove("hidden");
    }
  }
}
